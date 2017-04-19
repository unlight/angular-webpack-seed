import { isTruthy } from './stryker.component';

describe('Stryker demo:', () => {

    describe('isTruthy', () => {

        it('isTruthy positive', () => {
            let result = isTruthy(true);
            expect(result).toBeTruthy();
        });

        it('isTruthy positive', () => {
            let result = isTruthy(false);
            expect(result).toBeFalsy();
        });

    });
});
