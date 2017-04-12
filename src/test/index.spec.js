'use strict';
const should = require('should');
import {
    BaseModel,
    distance,
    price
} from './../index.js';

class IndexItem extends BaseModel{
    @price('wy')
    price = 10;
    @distance('wkm')
    mileage = 10;
}

describe('decorator', function () {
    it('检查parseJSON后的price和mileage', function (done) {
        const model = new IndexItem();
        model.parseJSON({
            price: '100000_$y',
            mileage: '100000000_$m'
        });
        console.log(model.price)
        console.log(model.mileage)
        model.price.should.equal(10);
        model.mileage.should.equal(10);
        done();
    });
    it('检查序列化后的值', function (done) {
        const model = new IndexItem();
        model.parseJSON({
            price: '100000_$y',
            mileage: '100000000_$m'
        });
        JSON.stringify(model).should.equal('"{\\"price\\":\\"10_$wy\\",\\"mileage\\":\\"10_$wkm\\"}"');
        done();
    });
    it('检查parseJSON后的price和mileage', function (done) {
        class IndexItem extends BaseModel{
            @price('y')
            price = 10;
            @distance('km')
            mileage = 10;
        }
        const model = new IndexItem();
        model.parseJSON({
            price: '100000_$y',
            mileage: '100000000_$m'
        });
        console.log(model.price)
        console.log(model.mileage)
        model.price.should.equal(100000);
        model.mileage.should.equal(100000);
        done();
    });
    it('检查parseJSON后的price和mileage', function (done) {
        class IndexItem extends BaseModel{
            @price('f')
            price = 10;
            @distance('wkm')
            mileage = 10;
        }
        const model = new IndexItem();
        model.parseJSON({
            price: '10_$wy',
            mileage: '10000_$km'
        });
        console.log(model.price)
        console.log(model.mileage)
        model.price.should.equal(1000000);
        model.mileage.should.equal(1);
        done();
    });
});
