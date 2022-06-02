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

  static async getPriceRange(id, vsId, days = 14, interval = "daily") {
    if (id === vsId) {
      try {
        const vs = Object.values(currencies).find(c => c.id === vsId);
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart`,
          {
            params: {
              vs_currency: vs.symbol,
              days,
              interval
            }
          }
        );
        return response.data.prices.map(p => [p[0], 1]).slice(0, -1);
      } catch (e) {
        console.log(e);
        return {};
      }
    }
    try {
      const vs = Object.values(currencies).find(c => c.id === vsId);
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
        {
          params: {
            vs_currency: vs.symbol,
            days,
            interval
          }
        }
      );
      return response.data.prices.slice(0, -1);
    } catch (e) {
      console.log(e);
      return {};
    }
  }
}
