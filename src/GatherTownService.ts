import dotenv from 'dotenv';
import got from 'got';
import fs from 'fs';
import { GuestList } from './types';

dotenv.config();

export class GatherTownService {
  private readonly API_KEY = process.env.GATHER_API_KEY;
  private readonly gatherURL = 'https://gather.town/api';

  async getMap(spaceId: string, mapId: string) {
    const response = await got.get(
      `${this.gatherURL}/getMap?apiKey=${this.API_KEY}&spaceId=${spaceId}&mapId=${mapId}`
    );
    return response.body;
  }

  async getEmailGuestlist(spaceId: string) {
    const { body } = await got.get(
      `${this.gatherURL}/getEmailGuestlist?apiKey=${this.API_KEY}&spaceId=${spaceId}`
    );

    return body;
  }

  async setEmailGuestlist(spaceId: string, guestList: GuestList) {
    const { body } = await got.post(`${this.gatherURL}/setEmailGuestlist`, {
      json: {
        apiKey: this.API_KEY,
        spaceId: spaceId,
        guestlist: guestList,
        overwrite: true,
      },
    });

    return body;
  }

  async setMap(spaceId: string, mapId: string, mapContent: any) {
    try {
      await got.post(`${this.gatherURL}/setMap`, {
        json: {
          apiKey: this.API_KEY,
          spaceId: spaceId,
          mapId: mapId,
          mapContent,
        },
      });
    } catch (e) {
      console.error(e.message);
    }
  }

  async createRoom(spaceId: string, name: string) {
    const url = `${this.gatherURL}/createRoom`;
    console.log(url);
    try {
      const { body } = await got.post(url, {
        json: { name, apiKey: this.API_KEY, sourceSpace: spaceId },
      });
      return body;
    } catch (e) {
      console.log(e.message);
    }
  }
}
