import { isTruthy, getName } from './stryker.component';

describe('Stryker demo:', () => {

    describe('isTruthy', () => {

        it('isTruthy positive', () => {
            let result = isTruthy(true);
            expect(result).toBeTruthy();
        });

        it('isTruthy negative', () => {
            let result = isTruthy(false);
            expect(result).toBeFalsy();
        });

    });

    describe('getName', () => {

        it('smoke test', () => {
            expect(getName).toBeDefined();
        });

        it('getName test A', () => {
            let result = getName();
            expect(result).not.toBeNull();
        });

    });

});
