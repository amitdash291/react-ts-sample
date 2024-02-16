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

    await screen.findByRole('heading')

    expect(screen.getByRole('heading')).toHaveTextContent("Hello there!")
    expect(screen.getByRole('button')).toBeDisabled()
})

it('handles server error', async () => {

    render(<Greeting url="/greetings/2"/>)

    fireEvent.click(screen.getByText('Load Greeting'))

    await screen.findByRole('alert')

    expect(screen.getByRole('alert')).toHaveTextContent('Oops, failed to fetch!')
    expect(screen.getByRole('button')).not.toBeDisabled()
})
