const St = imports.gi.St;
const Main = imports.ui.main;
const Mainloop = imports.mainloop;
const GLib = imports.gi.GLib;

let panelButton, panelButtonText, timeout;
let counter = 0;

function setButtonText () {
    var arrayOfItems = [];

    //date by glib
    var now = GLib.DateTime.new_now_local();
    var str = now.format("%Y-%m-%d %H-%M-%S")
    arrayOfItems.push(str)

    panelButtonText.set_text(arrayOfItems.join(' | '))
    return true; //if return void or false function will be stopped
}

function init () {


    panelButton = new St.Bin({
        style_class: "panel-button"
    });
    panelButtonText = new St.Label({
        style_class: "panel-text",
        text: "CryptoChecker"
    });
    panelButton.set_child(panelButtonText)
}

function enable () {
    Main.panel._rightBox.insert_child_at_index(panelButton,0);
    timeout = Mainloop.timeout_add_seconds(1.0, setButtonText)
}

function disable () {
    Mainloop.source_remove(timeout);
    Main.panel._rightBox.remove_child(panelButton);
}
