export interface CodePreviewProps {
  /**
   * `JSX` source code
   */
  code?: string;
  cssCode?: string;
  /**
   * Dependent component
   */
  dependencies?: Record<string, any>;
  demoContainerClassName?: string;
}
