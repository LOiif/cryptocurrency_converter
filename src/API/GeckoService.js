import axios from "axios";
import { currencies } from "../utils/constants";

export default class GeckoService {
  static async getPricesInUsd() {
    try {
      const ids = [];
      Object.values(currencies).forEach(async (c) => {
        ids.push(c.id);
      });
      const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${ids.join(",")}&vs_currencies=usd`);

      return Object.keys(response.data).reduce((result, el) => {
        return Object.assign({}, result, { [el]: response.data[el].usd });
      }, {});
    } catch (e) {
      console.log(e);
      return {};
    }
  }
}
