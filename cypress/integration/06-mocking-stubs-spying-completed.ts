import { AppComponent } from '../../src/app/app.component';

describe('mocking, stubing and spying', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  // -------------- HACK: stubbing and Mocking -------------
  it('should display posts on table', () => {
    cy.get('[data-test="btn-get"]').click();
    cy.get('[data-test="posts-table"]');
  });

  it('should display "stubed" posts on table', () => {
    cy.intercept('GET', '/stubed', [
      {
        userId: 4,
        id: 32,
        title: 'doloremque illum aliquid sunt',
        body: 'deserunt eos nobis asperiores et hic\nest debitis repellat molestiae optio\nnihil ratione ut eos beatae quibusdam distinctio maiores\nearum voluptates et aut adipisci ea maiores voluptas maxime',
      },
    ]).as('backendAPIStubed');

    cy.get('[data-test="btn-get-stubed"]').click();
    cy.wait('@backendAPIStubed').then(() => {
      cy.get('[data-test="posts-table"]');
    });
  });

  it('stubing using fixtures', () => {
    cy.intercept('GET', '/stubed', { fixture: 'posts' }).as('backendAPIStubed');

    cy.get('[data-test="btn-get-stubed"]').click();
    cy.wait('@backendAPIStubed').then(() => {
      cy.get('[data-test="posts-table"]');
    });
  });

  // NOTE: another way to stubbing
  const x = {
    sum: (a: number, b: number) => a + b,
  };
  it('using stub function to change body', () => {
    const spyFunc = cy
      .stub(x, 'sum')
      .callsFake((a: number, b: number) => a * b);

    expect(spyFunc(2, 3)).equal(6);
  });

  // -------------- HACK: spying -------------

  const app = new AppComponent();
  it('try spying', () => {
    const spyedFunc = cy.spy(app, 'spyOn');
    app.spyOn();
    expect(spyedFunc).to.be.called;
  });
});
