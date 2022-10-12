import { describe, expect, test } from 'vitest';
import { render, screen } from 'shared';

import Accordion from './Accordion';

describe('Accordion test', () => {
  test('should show title all the time', () => {
    render(
      <Accordion title="Testing">
        <h4>Content</h4>
      </Accordion>
    );

    expect(screen.getByText(/Testing/i)).toBeDefined();
  });
});
