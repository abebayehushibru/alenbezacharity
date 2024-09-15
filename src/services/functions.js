function formatDate(dt) {
    const date = new Date(dt);

    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

export { formatDate };
