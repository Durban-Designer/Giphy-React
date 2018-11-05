import React, { Component } from 'react';
import axios from 'axios'
import './search.css';

class Search extends Component {
  constructor (props) {
    super(props);
    this.state = {
      query: '',
      pageNo: 1,
      recordsPer: 12,
      list: <div className="nothing">Nothing to display</div>,
      error: false,
      loading: false
    }
    this.formSubmit = this.formSubmit.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
    this.updateRecords = this.updateRecords.bind(this);
    this.pageForward = this.pageForward.bind(this);
    this.pageBackward = this.pageBackward.bind(this);
  }
  formSubmit (evt) {
    evt.preventDefault()
    this.setState({loading: true});
    axios.get('https://api.quickvenom.org/search/' + this.state.query + '/' + this.state.pageNo + '/' + this.state.recordsPer)
      .then(response => {
        console.log(response.data)
        this.setState({
          loading: false,
          error: false,
          list: response.data.map((obj, i) =>
            <div className="gifCard" key={i}>
              <iframe className="contentFrame" src={obj.embed_url} title={obj.title} width="100%" height="100%" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
            </div>
          )
        });
      })
      .catch(err => {
        console.log(err)
        this.setState({
          error: true
        });
      })
  }
  updateQuery (event) {
    this.setState({query: event.target.value});
  }
  updateRecords (event) {
    this.setState({recordsPer: event.target.value});
  }
  pageForward (event) {
    this.setState({loading: true});
    axios.get('https://api.quickvenom.org/search/' + this.state.query + '/' + this.state.pageNo + '/' + this.state.recordsPer)
      .then(response => {
        console.log(response.data)
        this.setState({
          pageNo: (this.state.pageNo + 1),
          error: false,
          loading: false,
          list: response.data.map((obj, i) =>
            <div className="gifCard" key={i}>
              <iframe className="contentFrame" src={obj.embed_url} title={obj.title} width="100%" height="100%" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
            </div>
          )
        });
      })
      .catch(err => {
        console.log(err)
        this.setState({
          error: true
        });
      })
  }
  pageBackward (event) {
    this.setState({loading: true});
    axios.get('https://api.quickvenom.org/search/' + this.state.query + '/' + this.state.pageNo + '/' + this.state.recordsPer)
      .then(response => {
        console.log(response.data)
        this.setState({
          pageNo: (this.state.pageNo - 1),
          error: false,
          loading: false,
          list: response.data.map((obj, i) =>
            <div className="gifCard" key={i}>
              <iframe className="contentFrame" src={obj.embed_url} title={obj.title} width="100%" height="100%" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
            </div>
          )
        });
      })
      .catch(err => {
        console.log(err)
        this.setState({
          error: true,
          loading: false
        });
      })
  }
  render () {
    var errorSearchModal,
      Back,
      Forwards,
      Gifs
    if (this.state.error) {
      errorSearchModal =  <h4 className="errorMessage">Unable to Perform Search</h4>
    }
    if (this.state.loading !== true) {
      Gifs = <div className="gifs">
        {this.state.list}
      </div>
      if (this.state.query !== '') {
        Forwards = <button className="pageForward" onClick={this.pageForward}>→</button>
      }
    } else if (this.state.loading === true) {
      Gifs = <h2 className="loading">Loading</h2>
    }
    if (this.state.pageNo > 1 && this.state.loading !== true) {
      Back = <button className="pageBackward" onClick={this.pageBackward}>←</button>
    }
    return (
      <div className="main">
        <form className="search" onSubmit={this.formSubmit}>
          <input className="query" value={this.state.query} onChange={this.updateQuery} placeholder="Query"/>
          <input className="records" value={this.state.recordsPer} onChange={this.updateRecords} placeholder="records per page"/>
          <input className="submit" type="submit" value="Search" />
        </form>
        {errorSearchModal}
        {Gifs}
        <div className="buttons">
          {Forwards}
          <h2 className="PageNumber">{this.state.pageNo}</h2>
          {Back}
        </div>
      </div>
    );
  }
}

export default Search;
