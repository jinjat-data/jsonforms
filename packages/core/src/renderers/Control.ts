import { Renderer, RendererProps } from '../core/renderer';
import { update } from '../actions';

export interface ControlClassNames {
  input: string;
  label: string;
  wrapper: string;
}

export interface ControlProps extends RendererProps {
  data: any;
  path: string;
  classNames: ControlClassNames;
  id: string;
  visible: boolean;
  enabled: boolean;
  label: string;
  errors: any[];
  dispatch: any;
  required: boolean;
}

export interface ControlState {
  value: any;
}

export class Control<P extends ControlProps, S extends ControlState> extends Renderer<P, S> {

  constructor(props: P) {
    super(props);
    // tslint:disable:no-object-literal-type-assertion
    this.state = {
      value: props.data ? props.data : ''
    } as Readonly<S>;
    // tslint:enable:no-object-literal-type-assertion
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.data !== prevProps.data) {
      this.setState({ value: this.props.data });
    }
  }

  handleChange(value) {
    this.setState({ value });
    this.updateData(value);
  }

  private updateData(value) {
    this.props.dispatch(update(this.props.path, () => value));
  }
}
