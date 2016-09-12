import { Component } from 'substance'
import refToHTML from './refToHTML'

function RefComponent() {
  RefComponent.super.apply(this, arguments);
}

RefComponent.Prototype = function() {
  this.render = function($$) {
    var node = this.props.node
    var el = $$('div').addClass('sc-ref').attr('data-id', node.id);
    el.html(refToHTML(this.props.node));
    return el;
  };
};

Component.extend(RefComponent);

// Isolated Nodes config
RefComponent.fullWidth = true;
RefComponent.noStyle = true;

export default RefComponent;
