import React from 'react';
import './LinkCard.css';

// eslint-disable-next-line react/prop-types
const LinkCard = ({ link }) => {
  return (
    <>
      <h2>Link</h2>
      <p>
        Your link:
        <a
          // eslint-disable-next-line react/prop-types
          href={link.to}
          target="_blank"
          rel="noopener noreferrer"
          className="pad"
        >
          {link.to /* eslint-disable-line react/prop-types */}
        </a>
      </p>
      <p>
        From:
        <a
          // eslint-disable-next-line react/prop-types
          href={link.from}
          target="_blank"
          rel="noopener noreferrer"
          className="pad"
        >
          {link.from /* eslint-disable-line react/prop-types */}
        </a>
      </p>
      <p>
        Clicks count:
        <strong className="pad">
          {link.clicks /* eslint-disable-line react/prop-types */}
        </strong>
      </p>
      <p>
        Create date:
        <strong className="pad">
          {new Date( link.date /* eslint-disable-line react/prop-types */).toLocaleDateString()}
        </strong>
      </p>
    </>
  );
};

export default LinkCard;
