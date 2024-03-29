import ApiService from'./framework/api-service.js';

const Method = {
  GET   :'GET',
  PUT   :'PUT',
  POST  :'POST',
  DELETE:'DELETE',
};

export default class PoitApiService extends ApiService{
  get points(){
    return this._load({url:'points'}).
      then(ApiService.parseResponse).
      then((points)=> points.map(this.#adaptToClient));
  }

  get destinations(){
    return this._load({url:'destinations'}).
      then(ApiService.parseResponse);
  }

  get offers(){
    return this._load({url:'offers'}).
      then(ApiService.parseResponse);
  }

  async updatePoint(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return this.#adaptToClient(parsedResponse);
  }

  async addPoint(point) {
    const response = await this._load({
      url: 'points',
      method: Method.POST,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return this.#adaptToClient(parsedResponse);
  }

  async deletePoint(point){
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.DELETE,
    });

    return response;
  }

  #adaptToServer(point){
    const adaptedPoint = {
      ...point,
      'base_price': point.basePrice,
      'date_from':point.dateFrom ,
      'date_to':point.dateTo ,
      'is_favorite':point.isFavorite ,
    };

    delete adaptedPoint.basePrice;
    delete adaptedPoint.dateFrom;
    delete adaptedPoint.dateTo;
    delete adaptedPoint.isFavorite;

    return adaptedPoint;
  }

  #adaptToClient(point){
    const adaptedPoint = {
      ...point,
      basePrice: point.base_price,
      dateFrom:point.date_from ,
      dateTo:point.date_to ,
      isFavorite:point.is_favorite ,
    };

    delete adaptedPoint.base_price;
    delete adaptedPoint.date_from;
    delete adaptedPoint.date_to;
    delete adaptedPoint.is_favorite;

    return adaptedPoint;
  }
}
