import Handlebars from 'handlebars';

export function registerHandlebarsHelper(): void {
    Handlebars.registerHelper(
        'compare',
        function (
            this: Record<string, any>,
            value: number,
            operator: string,
            compareValue: number,
            options: Handlebars.HelperOptions
        ) {
            let result = false;

            switch (operator) {
                case '>':
                    result = value > compareValue;
                    break;
                case '<':
                    result = value < compareValue;
                    break;
                case '>=':
                    result = value >= compareValue;
                    break;
                case '<=':
                    result = value <= compareValue;
                    break;
                case '==':
                    result = value == compareValue;
                    break;
                case '===':
                    result = value === compareValue;
                    break;
                case '!=':
                    result = value != compareValue;
                    break;
                case '!==':
                    result = value !== compareValue;
                    break;
                default:
                    throw new Error(`Unknown operator: ${operator}`);
            }

            if (result) {
                return options.fn(this); // Execute the block if true
            } else {
                return options.inverse(this); // Execute the `else` block if false
            }
        }
    );
}
