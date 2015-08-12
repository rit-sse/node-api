import Officer from '../../models/Officer';

export default function seed() {
  return Officer
    .create({
      display: 'President',
      email: 'presiden@sse.se.rit.edu'
    });
}
