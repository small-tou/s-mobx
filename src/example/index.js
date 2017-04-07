import {
    BaseModel,
    distance,
    price
} from './../index';

class IndexItem extends BaseModel{

    icon = '';
    @price('wy')
    price = 10;
    @distance('wkm')
    mileage = 10;
}

var item = new IndexItem();

console.log(JSON.stringify(item))
