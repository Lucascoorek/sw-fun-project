import { Person } from './Person';

export interface Starship {
  'message': string;
  'result': {
    'properties': {
      'model': string;
      'starship_class': string;
      'manufacturer': string;
      'cost_in_credits': string;
      'length': string;
      'crew': string;
      'passengers': string;
      'max_atmosphering_speed': string;
      'hyperdrive_rating': string;
      'MGLT': string;
      'cargo_capacity': '3000000';
      'consumables': '1 year';
      'pilots': Person[];
      'created': string;
      'edited': string;
      'name': string;
      'url': string;
    };
    'description': string;
    'uid': string;
  };
}
