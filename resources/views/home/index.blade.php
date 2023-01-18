@extends('layout')
@section('content')
    <h1>{{ $title }}</h1>

{{--        <table class="table table-sm table-hover table-striped">--}}
{{--            <thead class="thead-light">--}}
{{--            <tr>--}}
{{--                <th>ID</th>--}}
{{--                <th>Nosaukums</th>--}}
{{--                <th>Autors</th>--}}
{{--                <th>Gads</th>--}}
{{--                <th>Cena</th>--}}
{{--                <th>Attēlot</th>--}}
{{--                <th>&nbsp;</th>--}}
{{--            </tr>--}}
{{--            </thead>--}}
{{--            <tbody> @for ($i = 0; $i < 10; $i++)--}}
{{--                <tr>--}}
{{--                    <td>{{ $book->id }}</td>--}}
{{--                    <td>{{ $book->name }}</td>--}}
{{--                    @if($book->author == null)--}}
{{--                        <td>Autors nav atrasts</td>--}}
{{--                    @else--}}
{{--                        <td>{{ $book->author->name }}</td>--}}
{{--                    @endif--}}
{{--                    <td>{{ $book->year }}</td>--}}
{{--                    <td>&euro; {{ number_format($book->price, 2, '.') }}</td>--}}
{{--                    <td>{!! $book->display ? '&#10004;&#65039;' : '&#10060;' !!}</td>--}}
{{--                    <td><a href="/books/update/{{ $book->id }}" class="btn btn-outline-primary btn-sm">Labot</a> /--}}
{{--                        <form method="post" action="/books/delete/{{ $book->id }}" class="d-inline deletion-form"> @csrf--}}
{{--                            <button type="submit" class="btn btn-outline-danger btn-sm">Dzēst</button>--}}
{{--                        </form>--}}
{{--                    </td>--}}
{{--                </tr>--}}
{{--            @endfor </tbody>--}}
{{--        </table>--}}
@endsection
