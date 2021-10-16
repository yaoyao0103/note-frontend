import PageDetail from "./PageDetail";

export default function PageSection({ pages }) {
  return (
    <div className="my-2 d-flex flex-column">
      <button
        type="button"
        className="btn btn-outline-secondary btn-sm mb-2 mx-2"
        data-bs-toggle="modal"
        data-bs-target="#addPageModal"
      >
        <i className="fa fa-plus"></i>
        Add Page
      </button>
      <ul className="list-group pages">
        {pages.map((page) => (
          <PageDetail page={page} key={page._id} />
        ))}
      </ul>
    </div>
  );
}
