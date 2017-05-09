class TemplatesLoader {

    constructor() {
        this.templatesCache = {};
    }

    get(templateName) {

        var handlebars = window.handlebars || window.Handlebars,
            Handlebars = window.handlebars || window.Handlebars;

        return new Promise((resolve, reject) => {
            if (this.templatesCache[templateName]) {
                resolve(Handlebars.compile(this.templatesCache[templateName]));
            }

            $.get(`./templates/${templateName}.handlebars`, template => {
                this.templatesCache[templateName] = template;
                resolve(Handlebars.compile(template));
            });
        });
    }
}

let templatesLoader = new TemplatesLoader();


export { templatesLoader };