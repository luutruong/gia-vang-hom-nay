"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio = __importStar(require("cheerio"));
const lodash_1 = __importDefault(require("lodash"));
const index_1 = require("../utils/index");
function extractPrice(root, node) {
    const price = lodash_1.default.trim(root(node).find('.fixW').text()).replace(/,/g, '');
    return parseInt(price);
}
function getData(date) {
    return __awaiter(this, void 0, void 0, function* () {
        const pageUri = `https://www.24h.com.vn/gia-vang-hom-nay-c425.html?d=${encodeURI(index_1.dateToYMD(date))}`;
        console.log(pageUri);
        const start = new Date();
        const html = yield index_1.httpGet(pageUri);
        const $ = cheerio.load(html);
        const data = [];
        const table = $('#container_tin_gia_vang div.tabBody');
        const rows = table.find('tbody tr');
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const cols = $(row).find('td');
            if (cols.length < 3) {
                continue;
            }
            data.push({
                name: lodash_1.default.trim($(cols[0]).text()),
                selling_price: extractPrice($, cols[1]),
                buying_price: extractPrice($, cols[2]),
                provider: '24h.com.vn',
            });
        }
        const timeElapsed = (new Date).getTime() - start.getTime();
        console.log(` > Parsing ${timeElapsed} ms`);
        return data;
    });
}
exports.default = getData;
