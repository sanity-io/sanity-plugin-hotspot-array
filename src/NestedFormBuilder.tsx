import React from 'react';
import { FormBuilderInput } from '@sanity/form-builder/lib/FormBuilderInput';

/**
 * Nesting FormBuilderInput components results in inconsistent focus & tab-index behaviour.
 *
 * FormBuilderInputs requests focus if props.focusPath matches the input.focusPath
 * when mounted and when props change. If multiple components "handle" the same focus path,
 * there is a race-condition on which component will receive the focus, often resulting
 * in seemingly random scrollbehaviour.
 *
 * This is a workaround, reusing as much of FormBuilderInput as possible.
 *
 * Use FormBuilderInput when you need to render a field obtained from a SchemaType (type.fields or type.fieldset[].field).
 *
 * Use NestedFormBuilder for decorator components that are used as inputComponent or in input-resolver.ts.
 *
 * Decorator components are components that just want to modify a type, add some markup or so on,
 * then delegate back to Sanity to obtain an actual input implementation.
 *
 * FormBuilderInput should only be used as the outermost component when resolving
 * inputs recursively.
 */

export class NestedFormBuilder extends FormBuilderInput {
    componentDidMount() {
      // do nothing - prevent focus-bug when nesting FormBuilderInput
    }
  
    // eslint-disable-next-line camelcase
    UNSAFE_componentWillReceiveProps() {
      // do nothing - prevent focus-bug when nesting FormBuilderInput
    }
  
    componentDidUpdate() {
      // do nothing - prevent focus-bug when nesting FormBuilderInput
    }
  
    render(): JSX.Element {
      const { type } = this.props;
      const InputComponent = this.resolveInputComponent(type);
      return <InputComponent {...this.props} ref={this.setInput} />;
    }
  }