import * as cheerio from 'cheerio';
import _ from 'lodash';
import {dateToYMD, httpGet} from '../utils/index';

export interface DataItem {
  name: string;
  selling_price: number;
  buying_price: number;
  provider: string;
}

function extractPrice(root: cheerio.CheerioAPI, node: cheerio.Node): number {
  const price = _.trim(root(node).find('.fixW').text()).replace(/,/g, '');

  return parseInt(price);
}

async function getData(date: Date): Promise<DataItem[]>  {
  const pageUri = `https://www.24h.com.vn/gia-vang-hom-nay-c425.html?d=${encodeURI(dateToYMD(date))}`;
  console.log(pageUri);
  const start = new Date();

  const html = await httpGet(pageUri);
  const $ = cheerio.load(html);

  const data: DataItem[] = [];

  const table = $('#container_tin_gia_vang div.tabBody');
  const rows = table.find('tbody tr');
  for (let i = 0; i < rows.length; i++) {
    const row: cheerio.Node = rows[i];
    const cols = $(row).find('td');
    if (cols.length < 3) {
      continue;
    }

    data.push({
      name: _.trim($(cols[0]).text()),
      selling_price: extractPrice($, cols[1]),
      buying_price: extractPrice($, cols[2]),
      provider: '24h.com.vn',
    });
  }

  const timeElapsed = (new Date).getTime() - start.getTime();
  console.log(` > Parsing ${timeElapsed} ms`);

  return data;
}

export default getData;
