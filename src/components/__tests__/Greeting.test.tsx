import {http, HttpResponse} from 'msw';
import {setupServer} from 'msw/node';
import {fireEvent, render, screen} from '@testing-library/react'
import '@testing-library/jest-dom';
import Greeting from "../Greeting.tsx";

const server = setupServer(
    http.get(
        '/greetings/1',
        () => HttpResponse.json({greeting: 'Hello there!'})
    ),
    http.get(
        '/greetings/2',
        () => HttpResponse.json({}, {status: 500})
    )
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

it('loads and displays greeting', async () => {
    render(<Greeting url="/greetings/1"/>)

    fireEvent.click(screen.getByText('Load Greeting'))

    const waitForHeadingToBeRendered = screen.findByRole('heading', {level: 2})
    expect(screen.getByRole('button')).toBeDisabled()
    await waitForHeadingToBeRendered

    expect(screen.getByRole('heading')).toHaveTextContent("Hello there!")
    expect(screen.getByRole('button')).toBeEnabled()
})

it('handles server error, displays alert and enables button', async () => {
    render(<Greeting url="/greetings/2"/>)

    fireEvent.click(screen.getByText('Load Greeting'))

    const waitForAlertToBeRendered = screen.findByRole('alert')
    expect(screen.getByRole('button')).toBeDisabled()
    await waitForAlertToBeRendered

    expect(screen.getByRole('alert')).toHaveTextContent('Oops, failed to fetch!')
    expect(screen.queryByRole('heading', {level: 2})).not.toBeInTheDocument()
    expect(screen.getByRole('button')).toBeEnabled()
})
