import dotenv from 'dotenv';
import got from 'got';
import fs from 'fs';

dotenv.config();

export class GatherTownService {
  private readonly API_KEY = process.env.GATHER_API_KEY;
  private readonly gatherURL = 'https://gather.town/api';
  private readonly spaceId = `kK2wRQcsvApyKu1H\\API%20Test`;
  private readonly mapId = `empty-room-small-brick`;

  async readMap() {
    const response = await got.get(
      `${this.gatherURL}/getMap?apiKey=${this.API_KEY}&spaceId=${this.spaceId}&mapId=empty-room-small-brick`
    );
    return response.body;
  }

  async setMap() {
    const mapContent = JSON.parse(
      fs.readFileSync('./map-data/map.json').toString()
    );
    console.log(mapContent.spawns)
    const response = await got.post(`${this.gatherURL}/setMap`, {
      json: {
        apiKey: this.API_KEY,
        spaceId: this.spaceId,
        mapId: this.mapId,
        mapContent,
      },
    });
    return response;
  }

  async createMap() {
    const url = `${this.gatherURL}/createRoom`;
    console.log(url);
    try {
      const response = await got.post(url, {
        json: { name: 'test', apiKey: this.API_KEY, sourceSpace: this.spaceId },
      });
      console.log(response);
      return response;
    } catch (e) {
      console.log(e.message);
    }
  }
}
