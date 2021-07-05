import { Request, Response } from "express";
import _ from "lodash";
import getData, {DataItem} from '../providers/24h';
import {dateToYMD, dateFromString} from '../utils/index';

class HomeController {
  public static index(req: Request, res: Response): void {
    const filterDate = (req.query.date ?? '') as string;
    const start = new Date().getTime();
    let dataDate: Date;
  
    if (filterDate) {
      try {
        dataDate = dateFromString(filterDate);
      } catch (e) {
        res.status(400).json({
          status: 'error',
          error: 'invalid date',
          page_time: (new Date().getTime() - start) / 1000,
        });

        return;
      }
    } else {
      dataDate = new Date();
    }

    getData(dataDate)
    .then((data: DataItem[]) => {
      res.json({
        status: 'ok',
        data,
        date: dateToYMD(dataDate),
        page_time: (new Date().getTime() - start) / 1000,
      })
    }).catch((err: Error) => {
      res.status(500).json({
        status: 'error',
        error: err,
        date: dateToYMD(dataDate),
        page_time: (new Date().getTime() - start) / 1000,
      });
    })
  }
}

export default HomeController;
