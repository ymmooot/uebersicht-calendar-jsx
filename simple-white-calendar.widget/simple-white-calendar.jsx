import { css } from "uebersicht";

const sundayFirstCalendar = 'cal -h && date "+|%-d"';
export const command = sundayFirstCalendar;
export const refreshFrequency = 3600000; // ms
export const className = `
  font-family: Source Han Code JP, Helvetica Neue;
  font-size: 16px;
  color: #fff;
  top: 10px;
  left: 40px;
`;
const rect = "30px";
const margin = "8px";

const parse = output => {
  if (!output) {
    return null;
  }

  const separated = output.split("|");
  const rows = separated[0].trim().split("\n");
  const today = separated[1].trim();
  return {
    headers: rows[0].split(" ").slice(0, 2),
    tableHeaderRow: rows[1].trim().split(" "),
    tableBodyRows: rows.slice(2).map(s => s.match(/.{3}|.{2}$/g)),
    today
  };
};

//////////////// header ////////////////
const headerCss = css`
  padding-left: 5px;
  font-size: 2rem;
  margin-bottom: 10px;
`;
const header = (month, year) => (
  <h1 className={headerCss}>
    {month} <span>{year}</span>
  </h1>
);

//////////////// table ////////////////
const tableCss = css`
  border-collapse: collapse;
  table-layout: fixed;
  font-size: 1rem;

  th {
    display: inline-block;
    width: ${rect};
    height: ${rect};
    text-align: center;
    font-size: 1rem;
    font-weight: bold;
  }
  th:not(:first-of-type) {
    margin-left: ${margin};
  }

  td {
    display: inline-block;
    width: ${rect};
    height: ${rect};
    text-align: center;
    line-height: ${rect};
    font-weight: bold;
  }
  td:not(:first-of-type) {
    margin-left: ${margin};
  }
`;

const todayCss = css`
  position: relative;
  font-weight: bold;
  text-shadow: 1px 1px #555;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
`;

const table = (headers, bodies, today) => {
  return (
    <table className={tableCss}>
      <thead>
        <tr>
          {headers.map(s => (
            <th>{s}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {bodies.map(row => (
          <tr>
            {row.map(s => (
              <td className={s.trim() === today ? todayCss : ""}>{s}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const render = ({ output, error }) => {
  if (error) {
    return <p>{error}</p>;
  }

  if (!output) {
    return <p>output is not defined</p>;
  }

  if(output){
  const s = parse(output);
    return (
      <div>
        {header(...s.headers)}
        {table(s.tableHeaderRow, s.tableBodyRows, s.today)}
      </div>
    );
  }
};
