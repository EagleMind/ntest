/**
  @jest-environment jsdom
 */
import { ImagesList } from '@/components/ImagesList'
import { getMarsRoverImages } from '@/services/nasaApi'
import { expect, jest, test } from '@jest/globals'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { fireEvent, render, screen } from '@testing-library/react'




describe('Images', () => {
  test('returns Images', async () => {
    const response = await getMarsRoverImages(1, 1)
    expect(response.status).toBe(200)
  })

})
describe('ImagesList component', () => {

  const mockPhotos = [
    {
      id: 1,
      sol: 100,
      camera: { id: 1, name: 'Camera1', full_name: 'Full Name 1' },
      img_src: 'https://example.com/image1.jpg',
      earth_date: '2022-01-01',
      rover: { id: 1, name: 'Rover1', landing_date: '2021-01-01', launch_date: '2020-01-01', status: 'active', max_sol: 200, max_date: '2022-01-01', total_photos: 100, cameras: [] },
    },
  ];

  it('renders ImagesList component with photos', () => {
    render(<ImagesList photos={mockPhotos} />);

    // Check if the heading is rendered
    expect(screen.getByText(/1 Photo/i)).toBeTruthy();


  });

  it('opens modal when a thumbnail is clicked', () => {
    render(<ImagesList photos={mockPhotos} />);

    // Mock the Modal component
    const mockModal = jest.fn();
    jest.mock('../components/Modal', () => ({ Modal: mockModal }));

  })
});