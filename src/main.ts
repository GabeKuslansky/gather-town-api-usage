import { GatherTownService } from './GatherTownService';
const gatherTownService = new GatherTownService();

(async () => {
  const response = await gatherTownService.setMap();
  console.log(response);
})();
