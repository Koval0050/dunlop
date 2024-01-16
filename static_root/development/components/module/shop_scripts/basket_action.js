function minus(wrapper, input_name, this_click) {
    let wrap = this_click.closest(wrapper);
    let input = wrap.querySelector(input_name);
    let value = Number(input.value);

    if (value <= 1) {
        input.value = 1;
    } else {
        input.value = value - 1;
    }

    return Number(input.value);
}

function plus(wrapper, input_name, this_click) {
    let wrap = this_click.closest(wrapper);
    let input = wrap.querySelector(input_name);
    let value = Number(input.value);

    input.value = value + 1;


    return Number(input.value);
}

function input_basket(input_name) {
    let input = input_name;
    let value = Number(input.value);

    if (value <= 0) {
        input.value = 1;
    }

    return Number(input.value);
}


function delete_item(this_click, wrapper) {
    let wrap = this_click.closest(wrapper);
    wrap.style.position = 'relative';
    wrap.style.transition = 'all .2s';
    wrap.style.maxHeight = '1000px';


    wrap.style.maxHeight = '0px';
    wrap.style.transform = 'scale(0)';
    setTimeout(() => {
        wrap.style.position = 'absolute';
    }, 200);
    setTimeout(() => {
        wrap.remove();
    }, 1000);
}


export { minus, plus, input_basket, delete_item }