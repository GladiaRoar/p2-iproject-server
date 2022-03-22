const keyOfRAWG = process.env.key;
const axios = require(`axios`);
const date = new Date();
const dateNow = date.toISOString().slice(0, 10);

class Controller {
  static async showGames(req, res, next) {
    try {
      date.setDate(date.getDate() - 0);
      date.setFullYear(date.getFullYear() - 1);
      const aYearBefore = date.toISOString().slice(0, 10);

      const data = await axios({
        method: `get`,
        url: `https://api.rawg.io/api/games`,
        params: {
          key: `7b6f7730d9af4cfebf2a880376bda74c`,
          dates: `${aYearBefore},${dateNow}`,
          ordering: `-added`,
        },
      });
      res.status(200).json(data.data.results);
    } catch (err) {
      next(err);
    }
  }
  static async UpcomingNextWeek(req, res, next) {
    try {
      date.setDate(date.getDate() + 7);
      date.setFullYear(date.getFullYear() - 0);
      const nextWeek = date.toISOString().slice(0, 10);
      // console.log(test);
      const data = await axios({
        method: `get`,
        url: `https://api.rawg.io/api/games`,
        params: {
          key: `7b6f7730d9af4cfebf2a880376bda74c`,
          dates: `${dateNow},${nextWeek}`,
          ordering: `-added`,
        },
      });
      res.status(200).json(data.data.results);
    } catch (err) {
      next(err);
    }
  }
  static async detailGame(req, res, next) {
    try {
      const id = +req.params.gameId;

      const data = await axios({
        method: `get`,
        url: `https://api.rawg.io/api/games/${id}`,
        params: {
          key: `7b6f7730d9af4cfebf2a880376bda74c`,
        },
      });
      const data2 = await axios({
        method: `get`,
        url: `https://www.cheapshark.com/api/1.0/games`,
        params: {
          title: `${data.data.name}`,
        },
      });
      // console.log(price.data);
      const price = Number(data2.data[0].cheapest);
      const total = price * 15000;

      console.log(data);

      res.status(200).json({ game: data.data, price: total });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
