export type Node = {
  id: string;
  position: {
    x: number;
    y: number;
  };
  data: {
    label: string;
    blueprint: string;
    url: string;
  };
};

export type Edge = {
  id: string;
  source: string;
  target: string;
  data: {
    label: string;
  };
};
