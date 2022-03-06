class CraftingPanel{

    static ID = 'Fallout-Crafting';

    static TEMPLATES = {
        CRAFTINGPANELTEMPLATE : `modules/${this.ID}/Data_Files/Fallout-Crafting.hbs`
    }

    static async CraftingPanelButton(html,actor){
        const Button_title = game.i18n.localize('BUTTON.button_title')
        $(`
            <a class="item-control item-give-module craft-module-button" title="${Button_title}">
              <i class="fas fa-hammer"/>
            </a>
        `).insertAfter(html.find("a.item-control.item-stash"));
    }
}

Hooks.on(`renderActorSheet`, (sheet, html, character) => {
    CraftingPanel.CraftingPanelButton(html,sheet.actor);
    html.on('click', 'a.craft-module-button', (event) =>{

        const template_file = CraftingPanel.TEMPLATES.CRAFTINGPANELTEMPLATE;
        loadTemplates([
            "modules/Fallout-Crafting/Data_Files/parts/Weapons.html",
            "modules/Fallout-Crafting/Data_Files/parts/Appareal.html",
            "modules/Fallout-Crafting/Data_Files/parts/Food.html",
            "modules/Fallout-Crafting/Data_Files/parts/Beverages.html",
            "modules/Fallout-Crafting/Data_Files/parts/Chems.html"]);
        const template_data = { header: "Handlebars header text.",
            tabs: [
                { label: "Weapons",
                    title: "Weapons",},
                { label: "Appareal",
                    title: "Appareal",},
                { label: "Food",
                    title: "Food",},
                { label: "Beverages",
                    title: "Beverages"},
                { label: "Chems",
                    title: "Chems"}],
            footer: "Handlebars footer text."};
        const my_form = new CraftingPanelConfig(template_data, { template: template_file,
            tabs: [{navSelector: ".tabs", contentSelector: ".content", initial: "tab1"}] }); // data, options
        const res = my_form.render(true);
    });
});

class CraftingPanelConfig extends FormApplication{
    constructor(object, options) {
        super(object, options);
    }

    static get defaultOptions() {
        const defaults = super.defaultOptions;

        const overrides = {
            height: 'auto',
            width: 'auto',
            title: 'Crafting Panel',
            closeOnSubmit: false, // do not close when submitted
            submitOnChange: true, // submit when any input changes
        };

        const mergedOptions = foundry.utils.mergeObject(defaults, overrides);

        return mergedOptions;
    }

    getData(options = {}) {
        return super.getData().object; // the object from the constructor is where we are storing the data
    }

    activateListeners(html) {
        super.activateListeners(html);
    }

    async _updateObject(event, formData) {
        return;
    }
}


