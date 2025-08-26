import React from 'react';

const Table = ({ headers, data, renderRow, emptyMessage }) => {
  return (
    <div className="data-table-container">
      {data && data.length > 0 ? (
        <table className="data-table">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <React.Fragment key={item.id || index}>
                {renderRow(item, index)}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="empty-message">{emptyMessage || "No data available."}</p>
      )}
    </div>
  );
};

export default Table;
