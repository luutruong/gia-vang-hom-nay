"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _24h_1 = __importDefault(require("../providers/24h"));
const index_1 = require("../utils/index");
class HomeController {
    static index(req, res) {
        var _a;
        const filterDate = ((_a = req.query.date) !== null && _a !== void 0 ? _a : '');
        const start = new Date().getTime();
        let dataDate;
        if (filterDate) {
            try {
                dataDate = index_1.dateFromString(filterDate);
            }
            catch (e) {
                res.status(400).json({
                    status: 'error',
                    error: 'invalid date',
                    page_time: (new Date().getTime() - start) / 1000,
                });
                return;
            }
        }
        else {
            dataDate = new Date();
        }
        _24h_1.default(dataDate)
            .then((data) => {
            res.json({
                status: 'ok',
                data,
                date: index_1.dateToYMD(dataDate),
                page_time: (new Date().getTime() - start) / 1000,
            });
        }).catch((err) => {
            res.status(500).json({
                status: 'error',
                error: err,
                date: index_1.dateToYMD(dataDate),
                page_time: (new Date().getTime() - start) / 1000,
            });
        });
    }
}
exports.default = HomeController;
