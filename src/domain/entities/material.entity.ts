export interface chapter {
  id: string;
  title: string;
  description: string;
  locked: boolean;
  icon_url: string;
}

export interface material {
  id: string;
  title: string;
  content: string[] | string;
  visual_content_url: string;
}
