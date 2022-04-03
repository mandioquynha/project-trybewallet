import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrency, walletBank } from '../actions';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      id: '',
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
      exchangeRates: [],
    };
  }

  componentDidMount = async () => {
    const { getCurrency } = this.props;
    getCurrency();
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value }, () => this.addExpense());
  }

  addExpense = () => {
    const { currencies } = this.props;
    this.setState({ exchangeRates: currencies });
    const { id, value, description, currency, method, tag, exchangeRates } = this.state;
    const index = id >= 0 ? this.setState({ id: id + 1 }) : id;
    this.setState({ id: index });
    const information = [id, value, description, currency, method, tag, exchangeRates];
    walletBank(information);
    console.log('click');
  }

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <>
        <form>
          <label htmlFor="value">
            Valor:
            <input
              type="number"
              id="value"
              name="value"
              value={ value }
              data-testid="value-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currrency">
            Moeda
            <select
              id="currrency"
              data-testid="currency-input"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              {currencies.map((element, index) => (
                <option
                  key={ index }
                  value={ element }
                >
                  {element}
                </option>))}
            </select>
          </label>
          <label htmlFor="method">
            Metodo de pagamento:
            <select
              id="method"
              data-testid="method-input"
              name="method"
              value={ method }
              onChange={ this.handleChange }
            >
              <option value="dinheiro">Dinheiro</option>
              <option value="cartao-de-credito">Cartão de crédito</option>
              <option value="cartao-de-debito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Categoria:
            <select
              id="tag"
              data-testid="tag-input"
              name="tag"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option value="alimentacao">Alimentação</option>
              <option value="lazer">Lazer</option>
              <option value="trabalho">Trabalho</option>
              <option value="transporte">Transporte</option>
              <option value="saude">Saúde</option>
            </select>
          </label>

          <label htmlFor="description">
            Descrição:
            <input
              type="text"
              id="description"
              name="description"
              value={ description }
              data-testid="description-input"
              onChange={ this.handleChange }
            />
          </label>
        </form>
        <button type="submit" onClick={ this.addExpense }>Adicionar despesa</button>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getCurrency: () => dispatch(fetchCurrency()),
  dispatchExtenses: (information) => dispatch(walletBank(information)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

Form.propTypes = {
  getCurrency: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);