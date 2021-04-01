const puppeteer = require('puppeteer');
const dotenv = require('dotenv');

const participants = {};

dotenv.config({ path: '.env.local' });
dotenv.config();

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  config.env.supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  const participantFunctions = {
    addParticipant: async ({ name, roomName, color }) => {
      const args = [
        '--use-fake-ui-for-media-stream',
        '--use-fake-device-for-media-stream',
        `--window-size=1920,1080`,
      ];

      if (color) {
        args.push(
          `--use-file-for-fake-video-capture=cypress/fixtures/${color}.y4m`
        );
      }

      const browser = await puppeteer.launch({
        headless: true,
        args,
      });
      const page = (participants[name] = await browser.newPage()); // keep track of this participant for future use
      await page.goto(`${config.baseUrl}/${roomName}`);
      await page.waitForSelector('#name');
      await page.type('#name', name);
      await page.click('[data-cy="continue"]');
      await page.waitForSelector('[data-cy="join-meeting"]:not([disabled])');
      await page.click('[data-cy="join-meeting"]');
      await page.waitForSelector('[data-cy="main-participant"] video');
      return Promise.resolve(null);
    },
    removeParticipant: async (name) => {
      const page = participants[name];
      await page.click('[data-cy="leave-meeting"]');
      await page.close();
      delete participants[name];
      return Promise.resolve(null);
    },
    removeAllParticipants: () => {
      return Promise.all(
        Object.keys(participants).map((name) =>
          participantFunctions.removeParticipant(name)
        )
      ).then(() => null);
    },
    participantCloseBrowser: async (name) => {
      const page = participants[name];
      await page.close({ runBeforeUnload: true });
      delete participants[name];
      return Promise.resolve(null);
    },
  };
  on('task', participantFunctions);

  return config;
};
