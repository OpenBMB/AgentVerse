import Base from '../Base';

export default class Command extends Base {
    readonly type: 'command';

    name: string;

}