import { screen, render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from './App';
import { StoreProvider } from './Store';

it('renders correctly', async () => {
  render(
    <StoreProvider>
      <App />
    </StoreProvider>
  );

  expect(screen.getAllByRole('img')).toHaveLength(6);
});

it('should filter by modality', async () => {
  render(
    <StoreProvider>
      <App />
    </StoreProvider>
  );

  const input = screen.getByRole('combobox', { name: /Modality/i });
  act(() => {
    userEvent.selectOptions(input, screen.getByRole('option', { name: 'OCT' }));
  });
  expect(screen.getByRole('option', { name: 'OCT' }).selected).toBe(true);
  expect(screen.getByRole('option', { name: 'OP' }).selected).toBe(false);

  const examination = document.getElementById('examination');
  expect(within(examination).queryByText(/OP/i)).not.toBeInTheDocument();
  expect(within(examination).queryAllByText(/OCT/i)).toHaveLength(4);
});

it('should filter by date', async () => {
  render(
    <StoreProvider>
      <App />
    </StoreProvider>
  );

  const input = screen.getByRole('combobox', { name: /Date/i });
  act(() => {
    userEvent.selectOptions(
      input,
      screen.getByRole('option', { name: '2019-04-13' })
    );
  });
  expect(screen.getByRole('option', { name: '2019-04-13' }).selected).toBe(
    true
  );
  expect(screen.getByRole('option', { name: '2019-04-01' }).selected).toBe(
    false
  );

  const examination = document.getElementById('examination');
  expect(
    within(examination).queryByText(/2019-04-01/i)
  ).not.toBeInTheDocument();
  expect(within(examination).queryAllByText(/2019-04-13/i)).toHaveLength(1);
});

describe('multiple filters', () => {
  it('should display results correctly if there are any', () => {
    render(
      <StoreProvider>
        <App />
      </StoreProvider>
    );

    const modalityInput = screen.getByRole('combobox', { name: /Modality/i });
    const dateInput = screen.getByRole('combobox', { name: /Date/i });
    act(() => {
      userEvent.selectOptions(
        modalityInput,
        screen.getByRole('option', { name: 'OCT' })
      );
      userEvent.selectOptions(
        dateInput,
        screen.getByRole('option', { name: '2019-04-13' })
      );
    });

    const examination = document.getElementById('examination');
    expect(within(examination).queryByText(/OP/i)).not.toBeInTheDocument();
    expect(within(examination).queryAllByText(/OCT/i)).toHaveLength(2);

    expect(
      within(examination).queryByText(/2019-04-01/i)
    ).not.toBeInTheDocument();
    expect(within(examination).queryAllByText(/2019-04-13/i)).toHaveLength(1);
  });

  it('should display a message when there are no results', () => {
    render(
      <StoreProvider>
        <App />
      </StoreProvider>
    );

    const modalityInput = screen.getByRole('combobox', { name: /Modality/i });
    const dateInput = screen.getByRole('combobox', { name: /Date/i });
    act(() => {
      userEvent.selectOptions(
        modalityInput,
        screen.getByRole('option', { name: 'OP' })
      );
      userEvent.selectOptions(
        dateInput,
        screen.getByRole('option', { name: '2019-04-13' })
      );
    });

    const examination = document.getElementById('examination');
    expect(
      within(examination).queryByText(
        'No images found for this date with the filters set.'
      )
    ).toBeInTheDocument();

    expect(
      within(examination).queryByText(/2019-04-01/i)
    ).not.toBeInTheDocument();
    expect(within(examination).queryAllByText(/2019-04-13/i)).toHaveLength(1);
  });
});
