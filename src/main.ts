import { GatherTownService } from './GatherTownService';
import { GuestList } from './types';
import { electricGuitarOnStand } from './objects';
const gatherTownService = new GatherTownService();

(async () => {
  const spaceId = `MqNq2nuVFwnv6NOa\\test`;
  const mapId = `empty-room-small-brick`;

  // const path = await gatherTownService.createRoom(spaceId, 'test');
  // console.log(path);

  const mapContent = await gatherTownService.getMap(spaceId, mapId);

  const {
    dimensions: [dimensionX, dimensionY],
  } = mapContent;

  mapContent.objects = [
    { ...electricGuitarOnStand },
    { ...electricGuitarOnStand },
    { ...electricGuitarOnStand },
    { ...electricGuitarOnStand },
  ];

  // Bottom right
  mapContent.objects[0].y = dimensionY - electricGuitarOnStand.height * 2;
  mapContent.objects[0].x = dimensionX - electricGuitarOnStand.width * 2;

  // Top Right
  mapContent.objects[1].y = 1;
  mapContent.objects[1].x = dimensionX - electricGuitarOnStand.width * 2;

  // Top Left
  mapContent.objects[2].y = 1;
  mapContent.objects[2].x = 1;

  // Bottom Left
  mapContent.objects[3].y = dimensionY - electricGuitarOnStand.height * 2;
  mapContent.objects[3].x = 1;

  await gatherTownService.setMap(spaceId, mapId, mapContent);

  // const guestList = await gatherTownService.getEmailGuestlist(spaceId);
  // console.log('Guestlist:', guestList);
  // const newGuestList: GuestList = {
  //   'kuslanskyg@gmail.com': {
  //     name: 'gabe',
  //     affiliation: 'guest',
  //     role: 'default',
  //   },
  // };

  // await gatherTownService.setEmailGuestlist(spaceId, newGuestList);

  // const updatedGuestlist = await gatherTownService.getEmailGuestlist(spaceId);
  // console.log('Updated guestlist:', updatedGuestlist);
})();
