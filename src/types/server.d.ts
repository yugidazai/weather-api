
interface ErrorResultCallback {
  ( error?: Error, result?: any ): void;
}

/**
 * Interface for a default function object.
 * Takes a params argument and callback with an error and result.
 *
 * @interface IDefaultFunction
 */
interface IDefaultFunction {
  ( params: any, done: ErrorResultCallback ): void;
}
