type Props = {
  description?: string;
};

const Empty = ({ description }: Props) => {
  return <p>{description ?? "There is no data to display"}</p>;
};

export default Empty;
