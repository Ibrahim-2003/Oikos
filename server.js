const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const util = require('util');
const { join, resolve } = require("path");
const mysql = require("mysql");
var bodyParser = require('body-parser');
const { append } = require('express/lib/response');
const { range } = require('express/lib/request');
const { query } = require('express');

// Set storage engine
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: function(req, file, cb) {
      // null as first argument means no error
      cb(null, file.originalname);
    },
  });

  const upload = multer({storage,
    dest: 'uploads/'});

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    //port: "3306",
    // password: "mytOUrnEysql2003$",
    password: "password",
    database: "riceplanner_db",
    timezone: 'utc'
});

connection.connect(function(error){
    if (error) throw error
    else console.log(`Connected to database successfully. Open port ${port}`);
});



const app = express();
const port = 5400;
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '')));

makeQuery = function(query,vals){
    return new Promise(function(resolve,reject){
        if(vals){
            connection.query(
                query,
                vals,
                function(err,rows){
                    if(rows === undefined){
                        console.log(new Error(`Error, the query was not successful - ${err}`));
                        reject(0);
                    }else{
                        resolve(rows);
                    }
                }
            )
        }else{
            connection.query(
                query,
                function(err,rows){
                    if(rows === undefined){
                        console.log(new Error(`Error, the query was not successful - ${err}`));
                        reject(0);
                    }else{
                        resolve(rows);
                    }
                }
            )
        }
        
    })
}

function get_summary(input){
    input = "TEST"

    // TEMPORARY RESULT -> Change to API call from database
    result = {stage: "New",
            list_source: "MLS",
            list_type: "Listed",
            prop_type: "Single Family",
            id: 1234567,
            community: "Oakland Manor",
            lot_size: 1234,
            style: "Traditional",
            stories: 2,
            garage: 2,
            basement: 0,
            school_score: 8,
            near_commercial: false,
            flood_zone: "Low",
            private_pool: false,
            county: "Fort Bend",
            tax_id: "1234567ABC",
            address: "123 Sky St.",
            city: "Houston",
            state: "TX",
            zip: 77001,
            list_price: "$1M",
            cap_rate: 0.065,
            r_value: "$1,495",
            m_value: "$1M",
            prop_image: "sample_home.png"}
    return result
}

function get_user(input){
    input = "TEST";
    result = {username: "User",
            password: "password",
            email: "123@gmail.com",
            profile_pic: "sample_user.jpg"}
    return result
}

function get_financials(input){
    input = "TEST";
    result = {yld: 0.0989,
            cash_on_cash: 0.0698,
            irr: 0.0698,
            appreciation: 0.0526,
            total_return: 150281,
            beds: 4,
            baths: 3,
            sqft: 1722,
            dom: 67,
            calc_offer: "$990K",
            win_prob: 0.99}
    return result;
}

function get_valuation(input){
    input = "TEST";
    result = {rental_value: "$1,500",
            opt_rent: "$1,500",
            mod_rent: "$1,500",
            cons_rent: "$1,500",
            market_value: "$1,500",
            opt_market: "$1,500",
            mod_market: "$1,500",
            cons_market: "$1,500",
            coords: [30.2529321, -97.7375292, 14]}
    return result
}

function get_comps(input){
    input = "TEST";
    property_1 = {rating: 1.00,
                status: 0, // 0 = closed, 1 = pending, 2 = active
                date: "04/30/2023",
                mls_num: 1234567,
                address: "132 Sky St.",
                city: "Austin",
                prop_type: "Single Family Home",
                subdivision: "Walker Ranch",
                dom: 65,
                dtc: 98,
                list_price: 426000,
                sale_price: 426000,
                psf: 147.76,
                beds: 4,
                baths: 2,
                level: 2,
                garage: 2,
                carport: false,
                slab: true,
                basement: false,
                sqft: 2500,
                lot_size: 0.25, // acres
                pool: false,
                built: 2005,
                hoa: 100,
                senr: 90,
                fin1: 1500,
                fin2: 500,
                fin3: 0,
                tot1: 2000,
                tot2: 500,
                tot3: 0}

    property_2 = {rating: 0.99,
        status: 1, // 0 = closed, 1 = pending, 2 = active
        date: "04/20/2023",
        mls_num: 2345678,
        address: "436 Elm St.",
        city: "Austin",
        prop_type: "Single Family Home",
        subdivision: "Heights",
        dom: 30,
        dtc: 60,
        list_price: 300000,
        sale_price: 285000,
        psf: 150,
        beds: 3,
        baths: 2.5,
        level: 2,
        garage: 2,
        carport: false,
        slab: true,
        basement: false,
        sqft: 2500,
        lot_size: 0.25, // acres
        pool: false,
        built: 2005,
        hoa: 100,
        senr: 90,
        fin1: 1500,
        fin2: 500,
        fin3: 0,
        tot1: 2000,
        tot2: 500,
        tot3: 0}

    property_3 = {rating: 0.94,
        status: 2, // 0 = closed, 1 = pending, 2 = active
        date: "04/30/2023",
        mls_num: 1234567,
        address: "132 Sky St.",
        city: "Austin",
        prop_type: "Single Family Home",
        subdivision: "Walker Ranch",
        dom: 65,
        dtc: 98,
        list_price: 426000,
        sale_price: 426000,
        psf: 147.76,
        beds: 4,
        baths: 2,
        level: 2,
        garage: 2,
        carport: false,
        slab: true,
        basement: false,
        sqft: 2500,
        lot_size: 0.25, // acres
        pool: false,
        built: 2005,
        hoa: 100,
        senr: 90,
        fin1: 1500,
        fin2: 500,
        fin3: 0,
        tot1: 2000,
        tot2: 500,
        tot3: 0}

        property_4 = {rating: 0.99,
            status: 0, // 0 = closed, 1 = pending, 2 = active
            date: "04/20/2023",
            mls_num: 2345678,
            address: "436 Elm St.",
            city: "Austin",
            prop_type: "Single Family Home",
            subdivision: "Heights",
            dom: 30,
            dtc: 60,
            list_price: 300000,
            sale_price: 285000,
            psf: 150,
            beds: 3,
            baths: 2.5,
            level: 2,
            garage: 2,
            carport: false,
            slab: true,
            basement: false,
            sqft: 2500,
            lot_size: 0.25, // acres
            pool: false,
            built: 2005,
            hoa: 100,
            senr: 90,
            fin1: 1500,
            fin2: 500,
            fin3: 0,
            tot1: 2000,
            tot2: 500,
            tot3: 0}

            property_5 = {rating: 0.99,
                status: 0, // 0 = closed, 1 = pending, 2 = active
                date: "04/20/2023",
                mls_num: 2345678,
                address: "436 Elm St.",
                city: "Austin",
                prop_type: "Single Family Home",
                subdivision: "Heights",
                dom: 30,
                dtc: 60,
                list_price: 300000,
                sale_price: 285000,
                psf: 150,
                beds: 3,
                baths: 2.5,
                level: 2,
                garage: 2,
                carport: false,
                slab: true,
                basement: false,
                sqft: 2500,
                lot_size: 0.25, // acres
                pool: false,
                built: 2005,
                hoa: 100,
                senr: 90,
                fin1: 1500,
                fin2: 500,
                fin3: 0,
                tot1: 2000,
                tot2: 500,
                tot3: 0}

                property_6 = {rating: 0.99,
                    status: 2, // 0 = closed, 1 = pending, 2 = active
                    date: "04/20/2023",
                    mls_num: 2345678,
                    address: "436 Elm St.",
                    city: "Austin",
                    prop_type: "Single Family Home",
                    subdivision: "Heights",
                    dom: 30,
                    dtc: 60,
                    list_price: 300000,
                    sale_price: 264000,
                    psf: 150,
                    beds: 3,
                    baths: 2.5,
                    level: 2,
                    garage: 2,
                    carport: false,
                    slab: true,
                    basement: false,
                    sqft: 2500,
                    lot_size: 0.25, // acres
                    pool: false,
                    built: 2005,
                    hoa: 100,
                    senr: 90,
                    fin1: 1500,
                    fin2: 500,
                    fin3: 0,
                    tot1: 2000,
                    tot2: 500,
                    tot3: 0}

                    property_7 = {rating: 0.92,
                        status: 2, // 0 = closed, 1 = pending, 2 = active
                        date: "04/20/2023",
                        mls_num: 2345678,
                        address: "436 Elm St.",
                        city: "Austin",
                        prop_type: "Single Family Home",
                        subdivision: "Heights",
                        dom: 30,
                        dtc: 60,
                        list_price: 300000,
                        sale_price: 285000,
                        psf: 150,
                        beds: 3,
                        baths: 2.5,
                        level: 2,
                        garage: 2,
                        carport: false,
                        slab: true,
                        basement: false,
                        sqft: 2500,
                        lot_size: 0.25, // acres
                        pool: false,
                        built: 2005,
                        hoa: 100,
                        senr: 90,
                        fin1: 1500,
                        fin2: 500,
                        fin3: 0,
                        tot1: 2000,
                        tot2: 500,
                        tot3: 0}

    result = [property_1, property_2, property_3, property_4, property_5, property_6, property_7];
    return result
}

app.get('/', async function(req, res) {
    summary = get_summary("TEST");
    user_account = get_user("TEST");
    res.render('summary.ejs', {stage: summary.stage,
                            list_source: summary.list_source,
                            list_type: summary.list_type,
                            prop_type: summary.prop_type,
                            id: summary.id,
                            community: summary.community,
                            lot_size: summary.lot_size,
                            style: summary.style,
                            stories: summary.stories,
                            garage: summary.garage,
                            basement: summary.basement,
                            school_score: summary.school_score,
                            near_commercial: summary.near_commercial,
                            flood_zone: summary.flood_zone,
                            private_pool: summary.private_pool,
                            county: summary.county,
                            tax_id: summary.tax_id,
                            address: summary.address,
                            city: summary.city,
                            state: summary.state,
                            zip: summary.zip,
                            list_price: summary.list_price,
                            cap_rate: summary.cap_rate,
                            r_value: summary.r_value,
                            m_value: summary.m_value,
                            prop_image: summary.prop_image,
                            user_account: user_account});
})

app.get('/valuation', async function(req, res) {
    summary = get_summary("TEST");
    user_account = get_user("TEST");
    valuation = get_valuation("TEST");
    res.render('valuation.ejs', {address: summary.address,
                            city: summary.city,
                            state: summary.state,
                            zip: summary.zip,
                            list_price: summary.list_price,
                            cap_rate: summary.cap_rate,
                            r_value: summary.r_value,
                            m_value: summary.m_value,
                            prop_image: summary.prop_image,
                            user_account: user_account,
                            rental_value: valuation.rental_value,
                            opt_rent: valuation.opt_rent,
                            mod_rent: valuation.mod_rent,
                            cons_rent: valuation.cons_rent,
                            market_value: valuation.market_value,
                            opt_market: valuation.opt_market,
                            mod_market: valuation.mod_market,
                            cons_market: valuation.cons_market,
                            coords: valuation.coords});
})

app.get('/financials', async function(req, res){
    summary = get_summary("TEST");
    user_account = get_user("TEST");
    financials = get_financials("TEST");
    res.render('financials.ejs', {address: summary.address,
                            city: summary.city,
                            state: summary.state,
                            zip: summary.zip,
                            list_price: summary.list_price,
                            cap_rate: summary.cap_rate,
                            r_value: summary.r_value,
                            m_value: summary.m_value,
                            prop_image: summary.prop_image,
                            user_account: user_account,
                            yld: financials.yld,
                            cash_on_cash: financials.cash_on_cash,
                            irr: financials.irr,
                            appreciation: financials.appreciation,
                            total_return: financials.total_return,
                            beds: financials.beds,
                            baths: financials.baths,
                            sqft: financials.sqft,
                            list_source: summary.list_source,
                            dom: financials.dom,
                            calc_offer: financials.calc_offer,
                            win_prob: financials.win_prob});
})

app.get('/comps', async function(req, res){
    summary = get_summary("TEST");
    user_account = get_user("TEST");
    comps = get_comps("TEST");
    res.render('comps.ejs', {address: summary.address,
                            city: summary.city,
                            state: summary.state,
                            zip: summary.zip,
                            list_price: summary.list_price,
                            cap_rate: summary.cap_rate,
                            r_value: summary.r_value,
                            m_value: summary.m_value,
                            prop_image: summary.prop_image,
                            user_account: user_account,
                            comps: comps});
})

app.listen(port);
console.log(`Listening on port ${port}...`);