import * as _       from "underscore";
import * as async   from "async";
import * as config  from "config";

export class Test {
  constructor(test_set: string, before_all?: Function, after_all?: Function) {

    beforeAll(done => {
      console.info(`Setting up tests for "${test_set}"...`);
      async.waterfall([
        cb => {
          if (!before_all) return cb();
          before_all(cb);
        }
      ], () => {
        console.info(`Tests setup for "${test_set}": DONE!`);
        done();
      });
    });

    afterAll(done => {
      async.waterfall([
        cb => {
          if (!after_all) return cb();
          after_all(cb);
        }
      ], () => {
        console.info(`Finish testing for "${test_set}"!`);
        done();
      });
    });
  }
}

export const executeTest = (test_name: string, test_method: Function, test_method_cb: Function, ...args: any[]) => {
  test(test_name, done => {
    if (_.isEmpty(args)) {
      test_method(test_method_cb(done));
    } else {
      test_method(...args, test_method_cb(done));
    }
  }, config.default_test_time_out || 5000);
}
