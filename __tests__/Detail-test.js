jest.autoMockOff();

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const Detail = require('../src/pages/Detail').default;

describe('Detail', () => {
  it('starts with zero commits', () => {
    const rendered = TestUtils.renderedIntoDocument(
      <Detail params={{repo: ''}} />
    );
    expect(rendered.state.commits.length).toEqual(0);
  });
  it('shows commits by default', () => {
    const rendered = TestUtils.renderedIntoDocument(
      <Details params={{repo: ''}} />
    );
    expect(rendered.state.model).toEqual('commits');
  });
  it('shows forks when the button is tapped', () => {
    const rendered = TestUtils.renderedIntoDocument(
      <Detail params={{repo: ''}} />
    );

    const forksButton = rendered.refs.forks;
    TestUtils.Simulate.click(forksButton);
    expect(rendered.state.model).toEqual('forks');
  });
  it('fetches forks from GitHub', () => {
    const rendered = TestUtils.renderedIntoDocument(
      <Detail params={{repo: 'react'}} />
    );
    waitsFor(() => {
      return rendered.state.forks.length > 0;
    }, "commits to be set", 2000);
    runs(() => {
      expect(rendered.state.forks.length).toEqual(30);
    });
  });
  it('fetches forks from a local source', () => {
    const rendered = TestUtils.renderIntoDocument(
      <Detail params={{repo: ''}} />
    );
    const testData = require('./forks.json');
    rendered.setState({'mode': 'forks', forks: testData});
    expect(rendered.state.forks.length).toEqual(30);
  });
});
