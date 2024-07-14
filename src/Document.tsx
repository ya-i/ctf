import type { PropsWithChildren } from 'react';
import { renderToString } from 'react-dom/server';

interface DocumentProps {
  title: string;
  styles: string[];
  scripts: string[];
}

export function render(Component: () => JSX.Element, props: DocumentProps) {
  const tree = (
    <Document {...props}>
      <Component />
    </Document>
  );

  const html = renderToString(tree);

  return '<!DOCTYPE html>' + html;
}

export function Document({
  title,
  styles = [],
  scripts = [],
  children,
}: PropsWithChildren<DocumentProps>) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {styles.map((href) => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
      </head>
      <body>
        <div id="react-root">{children}</div>

        {scripts.map((src) => (
          <script key={src} src={src} />
        ))}
      </body>
    </html>
  );
}
