import { GatherTownService } from './GatherTownService';
import { GuestList } from './types';
const gatherTownService = new GatherTownService();

(async () => {
  const spaceId = `kK2wRQcsvApyKu1H\\API%20Test`;
  const mapId = `empty-room-small-brick`;

  // Not working
  // const path = await gatherTownService.createRoom(spaceId, 'test');
  // console.log(path);

  const mapContent = await gatherTownService.getMap(spaceId, mapId);
  console.log('Map Content Length:', mapContent.length);

  // Not working
  // await gatherTownService.setMap(spaceId, mapId, mapContent);

  const guestList = await gatherTownService.getEmailGuestlist(spaceId);
  console.log('Guestlist:', guestList);
  const newGuestList: GuestList = {
    'kuslanskyg@gmail.com': {
      name: 'gabe',
      affiliation: 'guest',
      role: 'default',
    },
  };

  // Not working
  // await gatherTownService.setEmailGuestlist(spaceId, newGuestList);

  // const updatedGuestlist = await gatherTownService.getEmailGuestlist(spaceId);
  // console.log('Updated guestlist:', updatedGuestlist);
})();
