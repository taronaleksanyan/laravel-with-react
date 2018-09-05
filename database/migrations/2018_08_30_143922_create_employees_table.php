<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEmployeesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->increments('id');
            $table->string('firstName')->nullable(false);
            $table->string('lastName')->nullable(false);
            $table->integer('company')->unsigned();
            $table->index('company');
            $table->foreign('company')->references('id')->on('companies')->onDelete('cascade');
            
            $table->string('email');
            $table->string('phone');                       
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('employees');
    }
}
